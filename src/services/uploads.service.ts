import { useSnackbar } from 'notistack';
import { AxiosError, AxiosProgressEvent } from 'axios';
import useRequest from './request.service';
import { getFileFormData } from '@/helpers/upload.helper';
import API from '@/constants/api.constant';

interface useUploadServiceProps {
  showError: boolean;
  [key: string]: any;
}
interface IDocumentFileResponse {
  fileName: string;
  location: string;

  file: string;
  name: string;
}

const useUploadsService = (
  { showError = true }: useUploadServiceProps = { showError: true },
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { makeRequest: makeImageUploadRequest, ...imageUploadState } =
    useRequest();

/**
 *
 * @param {File[]} files The files you want to upload (an array of files)
 * @param onSuccess is a callback that will be called when the upload is successful
 * @param onError is a callback that will be called when the upload fails
 * @returns {Promise<any>}
 */
const uploadFiles = async (
  files: File[], // Now expecting an array of files
  onSuccess: (data: IDocumentFileResponse[]) => void,
  onError?: (err: AxiosError) => void
): Promise<any> => {
  try {
    const fileFormData = await getFileFormData(files); // Pass the array of files
    
    // Upload the files (assuming the API accepts multiple files at once)
    const res = await makeImageUploadRequest({
      url: API.upload,
      method: "POST",
      data: fileFormData,
    });

    const { data } = res;

    // Call the onSuccess callback with the array of responses
    onSuccess(data);
  } catch (e: any) {
    const res = e?.response;
    onError?.(res); // callback error if provided

    // Display error feedback
    const { status } = res;
    if (!showError) return; // skip errors if showError is false

    if (res) {
      enqueueSnackbar(res?.data?.data?.message, {
        variant: "rope_snackbar",
        autoHideDuration: 5000,
        error: true,
      });
    } else if (status === 500) {
      enqueueSnackbar("The file is too large. Please select smaller images.", {
        error: true,
      });
    } else {
      enqueueSnackbar("Could not upload successfully!", {
        error: true,
      });
    }
  }
};

  /**
   * @param {File} file The file you want to upload
   * @param onSuccess A callback called when the upload is successful
   * @param onError A callback called when the upload failed
   * @param onProgress A callback called to track upload progress
   * @returns {Promise<any>}
   */
  // const uploadDocuments = async (
  //   file: any[],
  //   onSuccess: (data: any) => void,
  //   onError?: (err: AxiosError) => void,
  //   onProgress?: (progressEvent: AxiosProgressEvent) => void, // Updated type for onProgress
  // ): Promise<any> => {
  //   try {
  //     const fileFormData = await getFileFormData(file);
  //     // upload photo
  //     const res = await makeImageUploadRequest({
  //       url: '',
  //       method: 'POST',
  //       data: filesFormData,
  //       onUploadProgress: onProgress,
  //     });

  //     const { data } = res;
  //     onSuccess(data.data);
  //   } catch (e: any) {
  //     const res = e?.response;
  //     onError?.(res); // callback error if added
  //     const { status, message } = res.data;
  //     if (!showError) return; // stop the errors from showing if `showError` is false
  //     if (res.status === 406) {
  //       enqueueSnackbar(message, {
  //         error: true,
  //       });
  //     } else if (res.status === 500) {
  //       enqueueSnackbar('The file is too large. File upload max is 200MB.', {
  //         error: true,
  //       });
  //     } else {
  //       enqueueSnackbar('Could not upload successfully!', {
  //         error: true,
  //       });
  //     }
  //   }
  // };

  return {
    imageUploadState,
    uploadFiles,
    // uploadDocuments,
  };
};

export default useUploadsService;
