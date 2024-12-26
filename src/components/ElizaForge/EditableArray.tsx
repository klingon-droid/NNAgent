import React from 'react';
import { Plus, X } from 'lucide-react';
import { EditableField } from './EditableField';

interface EditableArrayProps {
  values: string[];
  onChange: (values: string[]) => void;
  label: string;
  multiline?: boolean;
}

export const EditableArray: React.FC<EditableArrayProps> = ({
  values,
  onChange,
  label,
  multiline = false
}) => {
  const handleAdd = () => {
    onChange(['', ...values]);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-cyan-400 text-xs">{label}</h3>
        <button
          onClick={handleAdd}
          className="text-pink-500 hover:text-cyan-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-start gap-2">
            <EditableField
              value={value}
              onChange={(newValue) => handleChange(index, newValue)}
              multiline={multiline}
              className="flex-1"
            />
            <button
              onClick={() => handleRemove(index)}
              className="text-pink-500 hover:text-red-400 transition-colors pt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};