import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    const { isLoading, images } = this.props;
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
                toggleModal={this.props.toggleModal}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
