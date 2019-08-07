import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const TextForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  console.log("State Check:", users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="pro-form">
      <h1>Form Component</h1>

      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Field component="select" className="role-select" name="role">
          <option>Please Choose an Option</option>
          <option value="Hunter">Hunter</option>
          <option value="Shaman">Shaman</option>
          <option value="Paladin">Paladin</option>
        </Field>

        <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <div className="new-users">
        <h2>New Users</h2>
        {users ? users.map(user => <div key={user.id}>{user.name}</div>) : null}
      </div>
    </div>
  );
};

const FormikTextForm = withFormik({
  mapPropsToValues({ name, email, password, terms, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false,
      role: role || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Last Name First"),
    email: Yup.string().required("dont@me"),
    password: Yup.string().required("must submit to requirements")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.error(err.response));
  }
})(TextForm);

export default FormikTextForm;
