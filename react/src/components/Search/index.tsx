import { SetStateAction, Dispatch, ChangeEvent } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";
import "./index.scss";

interface SeachProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export const Search = ({ value, onChange, placeholder }: SeachProps) => {
  const clear = (): void => {
    onChange("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => onChange(event.target.value);

  return (
    <div className="search-input">
      <img className="search-icon" src={searchIcon} alt="Search" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {value && (
        <img className="close-icon" src={closeIcon} onClick={clear} alt="Close" />
      )}
    </div>
  );
};
