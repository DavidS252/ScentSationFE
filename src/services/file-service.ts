import apiClient from "./api-client";

interface IUpoloadResponse {
  url: string;
}
export const uploadPhoto = async (photo: File) => {
  return new Promise<string>((resolve, reject) => {
    const formData = new FormData();

    if (photo) {
      formData.append("file", photo);
      apiClient
        .post<IUpoloadResponse>("file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Upload response:", res);
          if (!res.data.url){
            return reject(new Error("No URL returned from upload"));
          }
          resolve(res.data.url);
        })
        .catch((err) => {
          reject(err);
        });
    } else throw new Error("No photo provided")
  });
};
