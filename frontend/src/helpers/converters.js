export const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => resolve({ result: reader.result, title: file.title });
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });
