import { uploadFileAxios } from "../../Axios/axiosPromise";
import { loadingMessage, successMessage } from "./useMessage";

function useUpload() {
	const uploadFile = async (formData = new FormData()) => {
		loadingMessage("Uploading ...", 0);

		return uploadFileAxios(formData).then((res = {}) =>
			successMessage("Uploaded successfully").then(() => Promise.resolve(res))
		);
	};

	return {
		uploadFile,
	};
}

export default useUpload;
