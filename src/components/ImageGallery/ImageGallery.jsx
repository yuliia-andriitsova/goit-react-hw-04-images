import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ isLoading, images, toggleModal }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              id={image.id}
              key={image.id}
              web={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              toggleModal={toggleModal}
            />
          ))}
        </ul>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
