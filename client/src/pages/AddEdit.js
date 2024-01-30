import React, { useEffect, useState } from 'react';
import "./AddEdit.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    name: "",
    email: "",
    contact: "",
}


const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { name, email, contact } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/get/${id}`).then((resp) => setState({ ...resp.data[0] }))
    }, [id])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("please provide value in each field");
        } else {
            if (!id) {
                axios.post("http://localhost:4000/api/post", {
                    name,
                    email,
                    contact,

                }).then(() => {
                    setState({ name: "", email: "", contact: "" })
                }).catch((err) => toast.error(err.response.data));

                toast.success("successfully added", {
                    autoClose: 12000,
                });
            } else {
                axios.put(`http://localhost:4000/api/update/${id}`, {
                    name,
                    email,
                    contact,

                }).then(() => {
                    setState({ name: "", email: "", contact: "" })
                }).catch((err) => toast.error(err.response.data));

                toast.success("content updated successfully", {
                    autoClose: 12000,
                });
            }

            setTimeout(() =>
                navigate.push("/"), 12000);
        }
    }



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxwidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="your name here..."
                    value={name || ""}
                    onChange={handleInputChange} />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your email here..."
                    value={email || ""}
                    onChange={handleInputChange} />
                <label htmlFor="contact">Contact</label>
                <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder="your number here..."
                    value={contact || ""}
                    onChange={handleInputChange} />
                <input type="submit" value={id ? "update" : "save"} />
                <Link to="/">
                    <input type="button" value="back" />
                </Link>
            </form>
        </div >
    );

};

export default AddEdit;