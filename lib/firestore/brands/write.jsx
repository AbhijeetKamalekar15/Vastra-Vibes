import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"; 
import {db, storage} from "../../../lib/firestore/firebase"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"

export const createNewBrand = async ({data, image}) => {
    if(!image){
        throw new Error("Image is Required");
    }
    if(!data?.name){
        throw new Error("Name is Required");
    }
    
    const newId = doc(collection(db, `ids`)).id;
    const imageRef = ref(storage, `brands/${newId}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    await setDoc(doc(db, `brands/${newId}`), {
        ...data,
        id: newId,
        imageURL: imageURL,
        timestampCreate: Timestamp.now(),
    })
}

export const updateBrand = async ({data, image}) => {
    
    if(!data?.name){
        throw new Error("Name is Required");
    }
    if(!data?.id){
        throw new Error("ID is Required");
    }
    const id = data?.id;
    let imageURL = data?.imageURL;
    if(image){
  const imageRef = ref(storage, `brands/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
    }
  

    await updateDoc(doc(db, `brands/${id}`), {
        ...data,
        id: id,
        imageURL: imageURL,
        timestampUpdate: Timestamp.now(),
    })
}

export const deleteBrand = async ({id})=>{
    if(!id){
        throw new Error("ID is required");
    }
    await deleteDoc(doc(db, `brands/${id}`));
}