import { useSnackbar } from 'notistack';
import { AxiosError, AxiosProgressEvent } from 'axios';
import useRequest from './request.service';
import { getFileFormData } from '@/helpers/upload.helper';

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
   * @param {IFile[]} files A List of Files you wanna upload
   * @param onSuccess is a callback that will be called when the upload is successful
   * @param onError is a callback that will be called when the upload failed
   * @returns {Promise<any>}
   */
  const uploadFiles = async (
    file: any,
    onSuccess: (data: IDocumentFileResponse[]) => void,
    onError?: (err: AxiosError) => void,
  ): Promise<any> => {
    try {
      const filesFormData = await getFileFormData(file);
      // upload photo
      const res = await makeImageUploadRequest({
        url: '',
        method: 'POST',
        data: filesFormData,
      });

      const { data } = res;

      // Call the onSuccess callback
      onSuccess(data);
    } catch (e: any) {
      const res = e?.response;
      onError?.(res); // callback error if added
      const { status, message } = res;
      if (!showError) return; // stop the errors from showing  if `showError` is false
      if (res.status === 406) {
        enqueueSnackbar(message, {
          error: true,
        });
      } else if (res.status === 500) {
        enqueueSnackbar(
          'The file is too large. Please select a smaller image.',
          {
            error: true,
          },
        );
      } else {
        enqueueSnackbar('Could not upload successfully!', {
          error: true,
        });
      }
    }
  };

  /**
   * @param {any[]} files A List of Files you want to upload
   * @param onSuccess A callback called when the upload is successful
   * @param onError A callback called when the upload failed
   * @param onProgress A callback called to track upload progress
   * @returns {Promise<any>}
   */
  const uploadDocuments = async (
    files: any[],
    onSuccess: (data: any) => void,
    onError?: (err: AxiosError) => void,
    onProgress?: (progressEvent: AxiosProgressEvent) => void, // Updated type for onProgress
  ): Promise<any> => {
    try {
      const filesFormData = await getFileFormData(files);
      // upload photo
      const res = await makeImageUploadRequest({
        url: '',
        method: 'POST',
        data: filesFormData,
        onUploadProgress: onProgress,
      });

      const { data } = res;
      onSuccess(data.data);
    } catch (e: any) {
      const res = e?.response;
      onError?.(res); // callback error if added
      const { status, message } = res.data;
      if (!showError) return; // stop the errors from showing if `showError` is false
      if (res.status === 406) {
        enqueueSnackbar(message, {
          error: true,
        });
      } else if (res.status === 500) {
        enqueueSnackbar('The file is too large. File upload max is 200MB.', {
          error: true,
        });
      } else {
        enqueueSnackbar('Could not upload successfully!', {
          error: true,
        });
      }
    }
  };

  return {
    imageUploadState,
    uploadFiles,
    uploadDocuments,
  };
};

export default useUploadsService;
