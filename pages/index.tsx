import { QueryResult, useMutation, useQuery } from "@apollo/client";
import {
  DELETE_CONTACT,
  GET_CONTACT,
  GET_CONTACT_DETAIL,
} from "@/graphql/contact";
import CenterContainer from "@/component/CenterContainer";
import Table from "@/component/Table";
import Button from "@/component/Button";
import { css } from "@emotion/css";
import Input from "@/component/Input";
import Row from "@/component/Row";
import { useState } from "react";
import { debounce } from "@/helper/debounce";
import { useRouter } from "next/router";
import Alert from "@/component/Alert";

const containerAction = css`
  display: flex;
  gap: 10px;
`;
interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  phones: { number: Number }[];
}

interface ListContact {
  loading: boolean;
  error: any;
  contact: IContact[];
}

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [orderBy, setOrderBy] = useState("first_name");

  const router = useRouter();

  const { data, loading, error, refetch }: QueryResult<ListContact> = useQuery(
    GET_CONTACT,
    {
      variables: {
        limit: 10,
        offset: offset * 10,
        where: {
          first_name: { _like: "%" + firstName + "%" },
        },
        order_by: { [orderBy]: "asc" },
      },
    }
  );
  const recallGetContact = (newOffset, newFirstName) => {
    const newVariables = {
      limit: 10,
      offset: newOffset * 10,
      where: {
        first_name: { _like: "%" + newFirstName + "%" },
      },
    };

    refetch(newVariables);
  };

  const [deleteContact, { loadingDelete, errorDelete }] =
    useMutation(DELETE_CONTACT);

  const columns = [
    { name: "id", width: "150px", key: "id" },
    {
      name: "First Name",
      key: "first_name",
      width: "150px",
      render: (item: IContact) => item.first_name,
    },
    {
      name: "Last Name",
      key: "last_name",
      render: (item: IContact) => item.last_name,
    },
    {
      name: "Created Date",
      key: "created_at",
      render: (item: IContact) => item.created_at,
    },
    {
      name: "Phones",
      render: (item: IContact) => (
        <select style={{ width: "200px",fontSize:'20px' }}>
          {item.phones.map((phone) => (
            <option>{phone.number}</option>
          ))}
        </select>
      ),
    },
    {
      name: "Action",
      render: (item: IContact) => (
        <div className={containerAction}>
          <Button onClick={()=>{
            router.push('/contact/'+item.id)
          }}>Edit</Button>
          <Button
            onClick={async () => {
              const { data } = await deleteContact({
                variables: {
                  id: item.id,
                },
              });
              recallGetContact(offset, firstName);
            }}
            variant="danger"
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  const onSearchByfirstName = debounce((e) => {
    setFirstName(e.target.value);
  }, 500);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Row>
        <h2>List Contact</h2>
        <div className={containerAction}>
          <Button
            variant="success"
            onClick={() => {
              router.push("/contact/add");
            }}
          >
            Add
          </Button>
        </div>
      </Row>
      <CenterContainer>
        <Input placeholder="Search" onChange={onSearchByfirstName} />
      </CenterContainer>
      <CenterContainer>
        <Table
          columns={columns}
          data={data?.contact}
          loading={loading}
          onClickHeader={(col) => {
            setOrderBy(col);
          }}
          page={offset + 1}
          onButtonRightClick={() => {
            if (data?.contact?.length < 10) {
              return;
            }
            setOffset(offset + 1);
          }}
          onButtonLeftClick={() => {
            if (offset === 0) {
              return;
            }
            setOffset(offset - 1);
          }}
        />
      </CenterContainer>
      {data?.contact?.length === 0 ? (
        <CenterContainer>
          <div
            onClick={() => {
              setOffset(offset - 1);
            }}
            style={{ cursor: "pointer" }}
          >
            <Alert backgroundColor={"orange"}>go back</Alert>
          </div>
        </CenterContainer>
      ) : null}
    </>
  );
}
