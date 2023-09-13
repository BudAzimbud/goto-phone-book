import React, { useEffect, useState } from "react";
import Button from "@/component/Button";
import Input from "@/component/Input";
import {
  ADD_CONTACT_WITH_PHONES,
  EDIT_CONTACT,
  GET_CONTACT_DETAIL,
} from "@/graphql/contact";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent } from "react";
import Alert from "@/component/Alert";
import { useRouter } from "next/router";
import CenterContainer from "@/component/CenterContainer";

function AddContact() {
  const router = useRouter();

  const { id } = router.query;
  const [editContactWithPhones, { loading, error }] = useMutation(EDIT_CONTACT);
  const { data } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id },
  });

  useEffect(() => {
    console.log(data?.contact_by_pk);
    if (data) {
      setPhones(data?.contact_by_pk?.phones);
    }
  }, [data]);

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
    console.log(first_name)
    console.log(last_name)
    try {
      const { data } = await editContactWithPhones({
        variables: {
          id,
          _set: {
            first_name,
            last_name,
          },
        },
      });
      if(data){
        router.push("/");
      }
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
        <form onSubmit={handleSubmit}>
          <Input
            required
            type="text"
            name="first_name"
            placeholder="First Name"
            defaultValue={data?.contact_by_pk?.first_name}
          />
          <br />
          <Input
            required
            type="text"
            name="last_name"
            placeholder="Last Name"
            defaultValue={data?.contact_by_pk?.last_name}
          />
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
          <Button type="submit">
            {loading ? "Loading.." : "Save Contact"}
          </Button>
        </form>
      </CenterContainer>

      <br />

      {error && <Alert backgroundColor="red">Error: {error.message}</Alert>}
    </div>
  );
}

export default AddContact;
