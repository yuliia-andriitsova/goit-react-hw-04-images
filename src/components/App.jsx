import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPhoto } from '../services/Fetch';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = ({ toggleModal }) => {
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const getApi = async () => {
      try {
        const data = await getPhoto();
        setImages(data.hits);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getApi();
  }, []);

  useEffect(() => {
    const getApi = async () => {
      if (page !== 1) {
        const data = await getPhoto(searchImage, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setIsLoading(false);
        setTotalHits(data.totalHits);
        return;
      }
      if (searchImage) {
        setIsLoading(true);
        const data = await getPhoto(searchImage, page);
        setIsLoading(false);
        setImages(data.hits);
        setTotalHits(data.totalHits);
      }
    };
    getApi();
  }, [page, searchImage]);

  const handleChange = event => {
    const { value } = event.target;
    setSearchImage(value);
  };

  const handleSubmit = searchImage => {
    setSearchImage(searchImage);
    setPage(1);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  toggleModal = largeImageURL => {
    if (!largeImageURL) {
      setActiveImage('');
    } else {
      setActiveImage(largeImageURL);
    }
  };
  if (isError || !images) {
    return 'Not found';
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar handleChange={handleChange} onSubmit={handleSubmit} />
      <ImageGallery
        images={images}
        isLoading={isLoading}
        toggleModal={toggleModal}
      />
      {totalHits > images.length && searchImage && !isLoading && (
        <Button handleClick={handleClick} />
      )}
      {activeImage && (
        <Modal toggleModal={toggleModal} largeImageURL={activeImage} />
      )}
    </div>
  );
};

//-------------------------------------------------------------------------
// import { Component } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { getPhoto } from '../services/Fetch';
// import { Searchbar } from './Searchbar/Searchbar';
// import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';

// export class App extends Component {
//   state = {
//     images: [],
//     searchImage: '',
//     isLoading: false,
//     isError: false,
//     page: 1,
//     activeImage: '',
//     isOpenModal: false,
//     totalHits: 0,
//   };

//   async componentDidMount() {
//     this.setState({ isLoading: true });

//     try {
//       const data = await getPhoto();
//       console.log(data);
//       this.setState({ images: data.hits });
//     } catch {
//       this.setState({ isError: true });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   async componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchImage !== this.state.searchImage &&
//       this.searchImage !== ''
//     ) {
//       this.setState({ isLoading: true });
//       const data = await getPhoto(this.state.searchImage, this.state.page);

//       this.setState({
//         images: data.hits,
//         isLoading: false,
//         totalHits: data.totalHits,
//       });
//     }

//     if (this.state.page !== prevState.page && this.state.page !== 1) {
//       const data = await getPhoto(this.state.searchImage, this.state.page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//         isLoading: false,
//         totalHits: data.totalHits,
//       }));
//     }
//   }

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = searchImage => {
//     this.setState({ searchImage, page: 1 });
//   };

//   handleClick = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   toggleModal = largeImageURL => {
//     if (!largeImageURL) {
//       this.setState({
//         activeImage: '',
//       });
//     } else {
//       this.setState({ activeImage: largeImageURL });
//     }
//   };

//   render() {
//     const { isError, images, searchImage, isLoading, totalHits } = this.state;
//     if (isError || !images) {
//       return 'Not found';
//     }
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: 16,
//           paddingBottom: 24,
//         }}
//       >
//         <Searchbar
//           handleChange={this.handleChange}
//           onSubmit={this.handleSubmit}
//         />
//         <ImageGallery
//           images={this.state.images}
//           isLoading={this.state.isLoading}
//           toggleModal={this.toggleModal}
//         />
//         {totalHits > images.length && searchImage && !isLoading && (
//           <Button handleClick={this.handleClick} />
//         )}
//         {this.state.activeImage && (
//           <Modal
//             toggleModal={this.toggleModal}
//             largeImageURL={this.state.activeImage}
//           />
//         )}
//       </div>
//     );
//   }
// }
