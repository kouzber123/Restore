import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked: string[] | undefined;
  onChange: (items: string[]) => void; //this is what we want to return from this list
}

export default function CheckBoxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    //they checked or about to check

    const currentIndex = checkedItems.findIndex(item => item === value);
    let newChecked: string[] = [];
    if (currentIndex === - 1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter(item => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }
  return (
    <FormGroup>
      {items.map(item => (
        <FormControlLabel
          key={item}
          control={<Checkbox
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handleChecked(item)}
            />}
          label={item}
        />
      ))}
    </FormGroup>
  );
}
