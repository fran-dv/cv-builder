import type { callbackProps, FormField } from "@/components";
import React, { useState } from "react";
import { IconButton, Form, Item } from "@/components";
import "./FormAccordion.css";
import { isEducationInfo, isExperienceInfo, type CVData } from "@/models";

interface MultiDataTypes<K extends keyof CVData> {
  "1": K;
  "2": K;
  "3": K;
}

interface Props<K extends keyof CVData> {
  fields: FormField[];
  dataType: K | MultiDataTypes<K>; // if multi item, specify the type of each item
  onChange: ({ data, dataType }: callbackProps) => void;
  onSubmit: (close?: boolean) => void;
  onExitWithoutSubmit: () => void;
  title: string;
  isActive: boolean;
  onShow: () => void;
  blockIcon?: React.ReactNode;
  currentData: CVData;
  multiItems?: boolean;
}

export const FormAccordion = <K extends keyof CVData>({
  fields,
  dataType,
  onChange,
  onSubmit,
  onExitWithoutSubmit,
  title,
  isActive,
  onShow,
  blockIcon,
  currentData,
  multiItems,
}: Props<K>) => {
  type ItemWithKey<K extends keyof CVData> = {
    key: K;
    value: CVData[K];
    id: string;
  };
  const [editingItem, setEditingItem] = useState<boolean>(false);
  const [existingItems, setExistingItems] = useState<Array<ItemWithKey<K>>>([]);

  const handleClose = () => {
    onExitWithoutSubmit();
    setEditingItem(false);
  };

  const showForm = () => {
    onShow();
  };

  const findFirstFreeItemSlot = <K extends string>(
    items: Array<{ key: K }>,
  ) => {
    const usedSlots = new Set(
      items.map((it) => {
        const lastChar = it.key.charAt(it.key.length - 1);
        return lastChar as "1" | "2" | "3";
      }),
    );

    if (!usedSlots.has("1")) return "1";
    if (!usedSlots.has("2")) return "2";
    if (!usedSlots.has("3")) return "3";
    return "-1";
  };

  const handleFormSubmit = ({ data, dataType }: callbackProps) => {
    if (multiItems) {
      onChange({ data, dataType });
    }
    const close = multiItems ? false : true;
    onSubmit(close); // don't close the dropdown if multi items

    if (multiItems && data) {
      const theKey = dataType as K;
      const itemWithKey: ItemWithKey<K> = {
        key: theKey,
        value: data,
        id: crypto.randomUUID(),
      };
      setExistingItems([...existingItems, itemWithKey]);
      setEditingItem(false);
    }
  };

  const deleteItem = (key: K, id: string) => {
    setExistingItems(existingItems.filter((item) => item.id !== id));

    // update currentData from parent
    onChange({ data: {}, dataType: key });
  };

  const nextSlot = findFirstFreeItemSlot(existingItems);

  return (
    <div className={`info-block ${isActive ? "expanded" : ""}`}>
      <div className="closed-block">
        {blockIcon}
        <h2 className="block-title">{title}</h2>
        <IconButton
          onClick={isActive ? handleClose : showForm}
          type="arrowDown"
          className={`block-arrow-down ${isActive ? "rotated" : ""}`}
        />
      </div>

      {(!multiItems || editingItem) && isActive && (
        <div>
          <Form
            fields={fields}
            onChange={onChange}
            onSubmit={handleFormSubmit}
            dataType={
              multiItems && nextSlot !== "-1"
                ? (dataType as MultiDataTypes<K>)[nextSlot]
                : (dataType as K)
            }
            currentData={currentData}
          />
        </div>
      )}

      {multiItems && isActive && !editingItem && (
        <>
          {existingItems?.map((item) => {
            if (!item) return null;

            const uniqueKey = item.id;

            if (
              isExperienceInfo(item.value) &&
              ("jobTitle" in item.value || "employer" in item.value)
            ) {
              const value = item.value;
              return (
                <Item
                  key={uniqueKey}
                  deleteCallback={() => deleteItem(item.key, item.id)}
                  title={value.jobTitle}
                  subtitle={value.employer}
                  startDate={value.startDate}
                  finishDate={value.finishDate}
                  place={value.city}
                  description={value.description}
                />
              );
            }
            if (isEducationInfo(item.value)) {
              const value = item.value;
              return (
                <Item
                  key={uniqueKey}
                  deleteCallback={() => deleteItem(item.key, item.id)}
                  title={value.degree}
                  subtitle={value.school}
                  startDate={value.startDate}
                  finishDate={value.finishDate}
                  place={value.city}
                  description={value.description}
                />
              );
            }
          })}

          {nextSlot !== "-1" && (
            <button
              onClick={() => setEditingItem(true)}
              className="submit-button"
            >
              <p>Add new item</p>
            </button>
          )}
        </>
      )}
    </div>
  );
};
