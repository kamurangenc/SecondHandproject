import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import DUMMY_PRODUCTS from "../Data/Data";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./ProductAdd.css";
import bg from '../../assets/soft-grey.jpg'
import { margin } from "@mui/system";

const ProductAdd = () => {
  const [data, setData] = useState([]);
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [form, setForm] = useState({
    id: Math.random().toString(),
    title: "",
    category: "",
    imageURL: [],
    description: "",
    price: "",
    place: "",
  });

  const saveItem = () => {
    if (
      form.title === "" ||
      form.category === "" ||
      form.imageURL.length === 0 ||
      form.description === "" ||
      form.price === "" ||
      form.place === ""
    ) {
      alert("Tum alanlari doldurunuz");
      return;
    }

    const userInfo = auth.currentUser;
    let uname = form.username;
    let uGmail = form.userGmail;
    let uPhoto = form.userPhoto;
    if (userInfo != null) {
      uname = userInfo.displayName;
      uGmail = userInfo.email;
      uPhoto = userInfo.photoURL;
    }
    setUsername(uname);
    setUserGmail(uGmail);
    setUserPhoto(uPhoto);

    data.push({
      ...form,
      username: uname,
      userGmail: uGmail,
      userPhoto: uPhoto,
    });

    localStorage.setItem("data", JSON.stringify(data));

    setForm({
      title: "",
      category: "",
      imageURL: ["", "", ""],
      description: "",
      price: "",
      place: "",
    });
    console.log(data);
  };

  useEffect(() => {
    getItem();
  }, []);

  console.log(username);
  console.log(userGmail);
  console.log(userPhoto);

  const getItem = () => {
    const localData = localStorage.getItem("data") ?? [];
    if (localData.length === 0) {
      localData.push(...DUMMY_PRODUCTS);
      setData(localData);
    } else {
      setData(JSON.parse(localData));
    }
  };
  const myStyle={
    backgroundImage: `url(${bg})` ,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '900px', 
    margin: 0
};
  return (
    <div style={myStyle} >
      {user ? (
        <Card className="ProductAdd__page" >
          <Form>
            <FormGroup className="ProductAdd__title">
              <Label>Başlık</Label>
              <Input
                type="text"
                name="text"
                id="text"
                placeholder="Enter title"
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                value={form.title}
              />
            </FormGroup>
            <FormGroup className="ProductAdd__category">
              <Label>Kategori</Label>
              <Input
                type="text"
                name="text"
                id="text"
                placeholder="Enter title"
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                value={form.category}
              />
            </FormGroup>
            <FormGroup className="ProductAdd__price">
              <Label>Fiyat</Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="Enter price"
                onChange={(event) =>
                  setForm({ ...form, price: event.target.value })
                }
                value={form.price}
              />
            </FormGroup>
            <FormGroup className="ProductAdd__place">
              <Label>Konum</Label>
              <Input
                type="text"
                name="place"
                id="place"
                placeholder="Enter place"
                onChange={(event) =>
                  setForm({ ...form, place: event.target.value })
                }
                value={form.place}
              />
            </FormGroup>
            <FormGroup className="ProductAdd__description">
            <Label>Açıklama</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter description"
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              value={form.description}
              style={{ height: 170, width: 505 }}
            />
          </FormGroup>
            <div className="image_div">
              <FormGroup className="ProductAdd__image">
                <Label>Fotoğraf 1</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="text"
                  placeholder="URL ekleyin"
                  onChange={(event) =>
                    setForm({ ...form, imageURL: [event.target.value] })
                  }
                  value={form.imageURL[0]}
                />
              </FormGroup>
              <FormGroup className="ProductAdd__image">
                <Label>Fotoğraf 2</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="text"
                  placeholder="URL ekleyin"
                  onChange={(event) =>
                    setForm({
                      ...form,
                      imageURL: [form.imageURL[0], event.target.value],
                    })
                  }
                  value={form.imageURL[1]}
                />
              </FormGroup>
              <FormGroup className="ProductAdd__image">
                <Label>Fotoğraf 3</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="text"
                  placeholder="URL ekleyin"
                  onChange={(event) =>
                    setForm({
                      ...form,
                      imageURL: [
                        form.imageURL[0],
                        form.imageURL[1],
                        event.target.value,
                      ],
                    })
                  }
                  value={form.imageURL[2]}
                />
              </FormGroup>
            </div>
      
            <Button
              className="ProductAdd__button"
              onClick={saveItem}
            >
              EKLE
            </Button>
          </Form>
        </Card>
      ) : (
        <div className="ProductAdd__signIn">
          <p>Lütfen Giriş yapınız</p>
        </div>
      )}
    </div>
  );
};

export default ProductAdd;
