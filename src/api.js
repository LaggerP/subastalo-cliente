let apiUrl;
export default apiUrl = 'http://10.0.2.2:3000'

// https://www.youtube.com/watch?v=1SIYtfwAVTo mirar video a la hora de mandar la imagen a cloudinary
const uploadImage = async (image) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'wybocykh');
  data.append('cloud_name', 'djlprd6ed');

  let uploaded_image = await fetch('https://api.cloudinary.com/v1_1/djlprd6ed/image/upload', {
    method: 'POST',
    body: data
  })
  return await uploaded_image.json()
}