import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from '../services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import 'styles.css';

import { StyledContainer } from './App.styled.js';

export const App = () => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  const getImages = useCallback(async (userInput, page) => {
    try {
      setIsLoading(true);
      const { hits } = await fetchImages(userInput, page);
      if (hits.length > 0) {
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }
    getImages(search, pageNumber);
  }, [search, pageNumber, getImages]);

  const loadMoreImages = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
  };

  const onSearch = search => {
    setSearch(search);
    setImages([]);
    setPageNumber(1);
  };

  const openModal = largeImage => {
    setIsModalOpen(true);
    setLargeImage(largeImage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledContainer>
      <Searchbar onSubmit={onSearch} />
      {search && images.length > 0 && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {isLoading && <Loader />}
      {search && images.length > 0 && (
        <Button loadMoreImages={loadMoreImages} />
      )}
      {isModalOpen && <Modal url={largeImage} onClose={closeModal} />}
      {error && <div>{error}</div>}
    </StyledContainer>
  );
};
