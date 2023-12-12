import React, { useState } from 'react';
import {
  StyledSearchbar,
  SearchForm,
  SearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() !== '') {
      onSubmit(searchQuery);
      setSearchQuery('');
    }
  };

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <StyledSearchbar onSubmit={handleSubmit}>
      <SearchForm>
        <StyledSearchFormInput
          type="text"
          value={searchQuery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </SearchForm>

      <SearchFormBtn type="submit" onClick={handleSubmit}>
        <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
      </SearchFormBtn>
    </StyledSearchbar>
  );
};
