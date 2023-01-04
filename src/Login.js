import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
// import content from "./static/Index";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
// import Account from "./static/Account";


// REACT-HOOKS-FORM + YUP SCHEMA

// const schema = yup.object({
//     username: yup.string(),
// }).required();

// export default function Login() {
//     // const { register, handleSubmit, formState:{errors} } = useForm({
//     //     resolver: yupResolver(schema)
//     // });

//     // const { register, handleSubmit, formState:{errors} } = useForm();

//     // const onSubmit = (data) => {
//     //     console.log(data);
//     // };

//     return (
//         <div>
//             <h1>Form Login</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {content.inputs.map((input, key) => {
//                 return (
//                     <div key={key}>
//                     <p>
//                         <label>{input.label}</label>
//                     </p>
//                     <p>
//                         <input name={input.name} type={input.type} {...register(input.name)} />
//                         <p>{errors.input.name?.message}</p>
//                     </p>
//                     </div>
//                 )
//                 })}

//                 <input {...register("username", {required: true, maxLength: 5})} />
//                 {errors.username?.type === 'required' && <span style={{color: "red"}}> Username is required!</span>}

//                 <br />
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     )
// }

// END.


// FORMIK + YUP

export default function Login() {
    const [login, setLogin] = useState(false);
    const myEmail = "sopyan@gmail.com";
    const myPassword = "12345678";

    useEffect(() => {
        console.log(login);
    }, [login])

    const formik = useFormik({
        initialValues: {
        //   full_name: "",
          email: "",
          password: "",
        //   confirm_password: ""
        },
        validationSchema: Yup.object({
            // full_name: Yup.string()
            //   .min(2, "Mininum 2 characters")
            //   .max(15, "Maximum 15 characters")
            //   .required("Required!"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Required!"),
            password: Yup.string()
              .min(8, "Minimum 8 characters")
              .required("Required!"),
            // confirm_password: Yup.string()
            //   .oneOf([Yup.ref("password")], "Password's not match")
            //   .required("Required!")
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log(values);

            if(values.email === myEmail) {
                if(values.password === myPassword) {
                    setLogin(true);
                } else {
                    alert("Password wrong!");
                }
            } else {
                alert("Account not found!");
            }
        }
    });

    return (
        <div style={{paddingTop: "150px"}}>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        {login && (
                            <h3 className="text-center text-success mt-4 mb-4">Welcome back!</h3>
                        )}
                        {!login && (
                            <h3 className="text-center mt-4 mb-4">Login</h3>
                        )}

                        <form onSubmit={formik.handleSubmit}>
                            {/* <div>
                                <label>Full Name</label>
                                <input type="text" className="form-control" name="full_name" value={formik.values.full_name} onChange={formik.handleChange} />
                                {formik.errors.full_name && formik.touched.full_name && (
                                    <p className="text-danger">{formik.errors.full_name}</p>
                                )}
                            </div> */}
                            <div>
                                <label>Email</label>
                                <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} />
                                {formik.errors.email && formik.touched.email && (
                                    <p className="text-danger">{formik.errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="mt-2">Password</label>
                                <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} />
                                {formik.errors.password && formik.touched.password && (
                                    <p className="text-danger">{formik.errors.password}</p>
                                )}
                            </div>
                            {/* <div>
                                <label className="mt-3">Confirm Password</label>
                                <input type="password" className="form-control" name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange} />
                                {formik.errors.confirm_password && formik.touched.confirm_password && (
                                    <p className="text-danger">{formik.errors.confirm_password}</p>
                                )}
                            </div> */}
                            <div>
                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                            </div>
                        </form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}
