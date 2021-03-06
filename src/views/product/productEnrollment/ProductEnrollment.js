import React, { useState, useEffect } from "react";
import { CCard, CButton } from "@coreui/react";
import { Descriptions, Input, Select, PageHeader } from "antd";
import "antd/dist/antd.css";
import { EditableTagGroup } from "../productSale/EditableTagGroup";
import axios from "axios";
import { Form, Button } from "antd";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductEnrollment = (props) => {
  const user = useSelector((state) => state.user);

  let history = useHistory();
  useEffect(() => {
    axios.get("/v1/categories").then((response) => {
      setCategories(response.data.data);
    });
  }, []);
  const { Option, OptGroup } = Select;
  const { TextArea } = Input;
  const [Title, setTitle] = useState("");
  const [CostPrice, setCostPrice] = useState(0);
  const [SalePrice, setSalePrice] = useState(0);
  const [Category, setCategory] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Content, setContent] = useState("");
  const [Tags, setTags] = useState([]);
  const [Images, setImages] = useState([]);

  function onChange(e) {
    setTitle(e.target.value);
  }
  function costPriceHandler(e) {
    setCostPrice(e.target.value);
  }
  function salePriceHandler(e) {
    setSalePrice(e.target.value);
  }
  function onContentHandler(e) {
    setContent(e.target.value);
  }

  function onCategoryHandler(e) {
    setCategory(e);
  }

  const updateTags = (newTags) => {
    setTags(newTags);
  };

  const onFinish = (files) => {
    let formData = new FormData();
    if (Images.length === 1) {
      formData.append("thumbnails", Images[0]);
    } else if (Images.length === 2) {
      formData.append("thumbnails", Images[0]);
      formData.append("thumbnails", Images[1]);
    }

    formData.append("title", Title);
    formData.append("content", Content);
    formData.append("cost_price", CostPrice);
    formData.append("sale_price", SalePrice);
    formData.append("category_ids", Category);
    formData.append("store_id", user.storeData.id);
    formData.append("tag_titles", Tags);

    axios.post("/v1/products", formData).then((response) => {
      if (response.data.code === 201) {
        alert("????????? ?????????????????????.");
        history.push("/productSale");
      } else {
        console.log("??????");
      }
    });
  };

  return (
    <>
      {user && user.storeData.name === "Error" ? (
        <div>???????????? ????????????.</div>
      ) : (
        <Form
          onFinish={() => {
            onFinish(Images);
          }}
        >
          <CCard>
            <PageHeader title="?????? ??????" className="site-page-header">
              <Descriptions bordered title="????????????">
                <Descriptions.Item label="?????? ?????????">
                  <div>
                    <label htmlFor="file">????????? ?????????</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files;
                        setImages([...file]);
                      }}
                    />
                  </div>
                </Descriptions.Item>

                <br />
                <br />

                <Descriptions.Item label="?????????">
                  <TextArea
                    showCount
                    maxLength={30}
                    onChange={onChange}
                    style={{ width: "50%" }}
                  />
                </Descriptions.Item>
                <br />
                <br />
                <Descriptions.Item label="?????? ??????">
                  <Input
                    type="number"
                    style={{ width: "20%" }}
                    defaultValue=""
                    onChange={costPriceHandler}
                  />
                  &nbsp;&nbsp;???
                </Descriptions.Item>
                <br />
                <br />
                <Descriptions.Item label="?????? ??????">
                  <Input
                    type="number"
                    style={{ width: "20%" }}
                    defaultValue=""
                    onChange={salePriceHandler}
                  />
                  &nbsp;&nbsp;???
                </Descriptions.Item>
                <br />
                <br />

                <Descriptions.Item label="????????????">
                  <Select
                    // defaultValue=""
                    style={{ width: 200 }}
                    onChange={onCategoryHandler}
                  >
                    {Categories &&
                      Categories.map((item, index) => (
                        <OptGroup label="category" key={index}>
                          <Option value={item.id}>{item.name}</Option>
                        </OptGroup>
                      ))}
                  </Select>
                </Descriptions.Item>
                <br />
                <br />

                <Descriptions.Item label="?????? ??????">
                  <TextArea
                    rows={4}
                    showCount
                    placeholder="?????? ?????? ??????"
                    maxLength="1000"
                    onChange={onContentHandler}
                  />
                </Descriptions.Item>
                <br />
                <br />
                {/* <Descriptions.Item label="?????? ??????">
<Checkbox onChange={onChange}>????????????</Checkbox>
<Checkbox onChange={onChange}>??? ?????????</Checkbox>
</Descriptions.Item> */}

                {/* <Descriptions.Item label="?????? ??????">
<section>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
  }}
>
  <span>??? ????????? ?????? ????????? ???????????????.</span>
  <Button type="primary">+ ?????? ??????</Button>
</div>
</section>
<br />
<section>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
  }}
>
  <span>??????1</span>
  <Input style={{ width: "40%" }} defaultValue="" />
  <span>????????????</span>
  <Input style={{ width: "40%" }} defaultValue="" />
  <Button type="danger">??????</Button>
</div>
</section>
</Descriptions.Item> */}
                <br />
                <br />
                <br />
                <Descriptions.Item label="????????? ??????">
                  <EditableTagGroup refreshFunction={updateTags} />
                  <br />
                  <span style={{ color: "gray", fontSize: "10px" }}>
                    ????????????, ??????, ??????, ??????????????? ????????? ????????? ??????????????????.
                  </span>
                </Descriptions.Item>
              </Descriptions>
              <br />
              <div style={{}}>
                <CButton color="info" className={"mb-1"}>
                  ??????
                </CButton>
                &nbsp;&nbsp;&nbsp;
                {/* <CButton
        color="danger"
        className={"mb-1"}
        onClick={onSubmitHandler}
        type="submit"
      >
        ??????
      </CButton> */}
                <Button type="primary" htmlType="submit">
                  ??????
                </Button>
              </div>
            </PageHeader>
          </CCard>
        </Form>
      )}
    </>
  );
};

export default withRouter(ProductEnrollment);
