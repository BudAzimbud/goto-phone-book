import React, { useState } from "react";
import Button from "@/component/Button";
import Input from "@/component/Input";
import { ADD_CONTACT_WITH_PHONES } from "@/graphql/contact";
import { useMutation } from "@apollo/client";
import { FormEvent } from "react";
import Alert from "@/component/Alert";
import { useRouter } from "next/router";
import CenterContainer from "@/component/CenterContainer";

function AddContact() {
  const [addContactWithPhones, { loading, error }] = useMutation(
    ADD_CONTACT_WITH_PHONES
  );

  const router = useRouter();
  const [phones, setPhones] = useState([{ number: "" }]);

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index].number = value;
    setPhones(newPhones);
  };

  const addPhoneField = () => {
    setPhones([...phones, { number: "" }]);
  };

  const removePhoneField = (index: number) => {
    const newPhones = [...phones];
    newPhones.splice(index, 1);
    setPhones(newPhones);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;

    try {
      const { data } = await addContactWithPhones({
        variables: { first_name, last_name, phones },
      });
      router.push("/");
    } catch (error) {
      console.error("Error adding contact with phones:", error);
    }
  };

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
      <CenterContainer>
      <h1>Add a New Contact with Phones</h1>

      </CenterContainer>

      <CenterContainer>
      <form  onSubmit={handleSubmit}>
        <Input required type="text" name="first_name" placeholder="First Name" />
        <br />
        <Input required type="text" name="last_name" placeholder="Last Name" />
        {phones.map((phone, index) => (
          <div key={index}>
            <br />
            <Input
            required
              type="text"
              name={`phone${index + 1}`}
              placeholder={`Phone ${index + 1}`}
              value={phone.number}
              onChange={(e: any) => handlePhoneChange(index, e.target.value)}
            />

            <button type="button" onClick={() => removePhoneField(index)}>
              Remove
            </button>
          </div>
        ))}
        <br />
        <button type="button" onClick={addPhoneField}>
          Add Phone
        </button>
        <br />

        <br />
        <Button type="submit">{loading ? "Loading.." : "Save Contact"}</Button>
      </form>
      </CenterContainer>
    
      <br />

      {error && <Alert backgroundColor="red">Error: {error.message}</Alert>}
    </div>
  );
}

export default AddContact;
