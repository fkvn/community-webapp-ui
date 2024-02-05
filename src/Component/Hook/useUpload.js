import { uploadFileAxios } from "../../Axios/axiosPromise";

function useUpload() {
	const uploadFile = async (formData = new FormData()) => {
		return uploadFileAxios(formData);
	};

	return {
		uploadFile,
	};
}

export default useUpload;
