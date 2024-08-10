import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export const isEmpty = (string: string) => string === '';

export const parseUrl = (link: string) => (link.endsWith('/') ? link : `${link}/`);

export const isUrl = (value: string) => yup.string().url().isValidSync(value);
export const isBaseUrl = (value: string) => value.endsWith('https://') || value.endsWith('http://');

export const convertImageToBase64 = async (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64String = dataUrl.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const convertUrlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64String = dataUrl.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


export const goToLink = (link: string) => {
  const a = document.createElement('a');
  a.href = link;
  // a.target = '_blank';
  a.rel = 'noopener nonreferrer';
  a.click();
};

export const goToLinkNewTab = (link: string) => {
  const a = document.createElement('a');
  a.target = '_blank';
  a.href = link;
  a.rel = 'noopener nonreferrer';
  a.click();
};

/**
 * This helps to remove any field that has empty strings.
 * @param values An object that holds key value pairs
 * @returns an object that is sanitized.
 */
 export const sanitiseFormData = (values: { [x: string]: any }) => {
  const keys = Object.keys(values);
  const newValues: { [x: string]: any } = {}; // Define the type of newValues explicitly
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const value = values[key];
    if (value) newValues[key] = value;
  }
  return newValues;
};


export const getEventImage = (images: string[]) => {
  const defaultImage =
    'https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    images.find(
      (image) => image.startsWith('http://res.cloudinary.com') || image.startsWith('https://res.cloudinary.com')
    ) || defaultImage
  );
};

export const roundToNearest10 = (num: number) => Math.ceil(num / 10) * 10;


/**
 * This function paginates an array of data and returns a subset based on the current page and items per page.
 * @param data The array of data to paginate
 * @param currentPage The current page number (zero-based index)
 * @param perPage The number of items per page
 * @returns An array containing the subset of data for the current page
 */
 export const usePagination = (data: any[], initialPage = 0, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginateData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const displayedData = paginateData();

  return {
    displayedData,
    handlePageChange,
  };
};

export const parseJson = (value: any) => {
  try {
    const previewArray = JSON.parse(value);
    return previewArray[0];
  } catch (error) {
    if (typeof value === "string") {
      return value;
    } else {
      return "";
    }
  }
};


export const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`Copied to clipboard!`);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy');
      });
  };


  export const slugify = (text: any) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  export const formatStoreName = (fullName: string) => {
    if (!fullName) return '';
    const firstName = fullName.split(' ')[0];
    return `${firstName}'s Store`;
  };

  export const sumArr = (arr: any[], key: string | number) => {
    let sum = arr.reduce(function (prev: any, cur: { [x: string]: any; }) {
      return Number(prev) + Number(cur[key]);
    }, 0);
    return sum;
  };


  export const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  export const formatAddOns = async (addOns: any, currentQuantity: number, currentCost: number, sizeArr: any) => {
    let temp: any = {};

    Object.keys(addOns).forEach((key: any, index) => {
      if (key === "size") {
        if (sizeArr && sizeArr.length > 0) {
          temp = {
            ...temp,
            Size: sizeArr
              .filter((s: { quantity: number; }) => s.quantity !== 0)
              .map((a: { name: any; quantity: any; price: any; }) => {
                return { name: a.name, quantity: a.quantity, price: a.price };
              }),
          };
        } else {
          temp = {
            ...temp,
            Size: [
              {
                name: `${addOns[key]}`,
                quantity: currentQuantity,
                price: currentCost,
              },
            ],
          };
        }
      } else if (key === "print_size") {
        temp = {
          ...temp,
          "Print Size": [
            {
              name: `${addOns[key]}`,
              quantity: currentQuantity,
              price: currentCost,
            },
          ],
        };
      } else {
        if (addOns[key].join() !== "") {
          let newKey: string = `${toTitleCase(key)}`;
          temp[newKey] = [
            {
              name: `${addOns[key]}`,
              quantity: currentQuantity,
              price: currentCost,
            },
          ];
        }
      }
    });
    return temp;
  };