import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button, Form} from "react-bootstrap";

import dayjs from "dayjs";
import axios from "axios";

const PAGE_SIZES = [10, 20, 30];

const blogs = () => {

  //view popup
  const [viewShow, setViewShow] = useState(false);

  const ViewClose = () => {
    setViewShow(false);
  };

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(blogs.slice(0, pageSize));

  //blogs state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [author, setAuthor] = useState("");
  const [created, setCreated] = useState("");
  const [path, setPath] = useState("");

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/documents"
      )
      .then((res) => {
        setBlogs(res.data.documents);
        setRecords(res.data.documents.slice(from, to));
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const handleViewShow = async (blogs) => {
    setViewShow(true);

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document/" +
          blogs.id
      )
      .then((res) => {
        console.log(res);
        setTitle(res.data.documents.title);
        setContent(res.data.documents.content);
        setCategory(res.data.documents.category);
        setDepartment(res.data.documents.department);
        setAuthor(res.data.documents.author);
        setCreated(res.data.documents.created_at);
        setPath(res.data.documents.path);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">เอกสารทั้งหมด</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">หน้าแรก</a>
                  </li>
                  <li className="breadcrumb-item active">เอกสาร</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <input type="search" className="form-control" placeholder="ค้นหาเอกสาร" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      style={{
                        fontFamily: "Prompt",
                      }}
                      withBorder
                      highlightOnHover
                      fontSize={"md"}
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="_id"
                      columns={[
                        {
                          accessor: "index",
                          title: "#",
                          textAlignment: "center",
                          width: 80,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        {
                          accessor: "title",
                          title: "ชื่อเอกสาร",
                        },
                        { accessor: "content", title: "รายละเอียด" },
                        { accessor: "category", title: "ประเภท" },
                        { accessor: "department", title: "หน่วยงาน" },
                        { accessor: "author", title: "จัดทำโดย" },
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "Actions",
                          width: 200,
                          render: (blogs) => (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleViewShow(blogs)}
                              >
                                <i className="fa fa-eye"></i>
                              </Button>{" "}
                              <a
                                className="btn btn-info btn-sm"
                                target="_blank"
                                href={
                                  "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/documents/" +
                                  blogs.path
                                }
                              >
                                <i className="fa fa-download"></i>
                              </a>{" "}
                            </>
                          ),
                        },
                      ]}
                      records={records}
                      minHeight={200}
                      totalRecords={blogs.length}
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                    />
                    {/* View Blog Madal */}
                    <Modal centered show={viewShow}>
                      <Modal.Header>
                        <Modal.Title>รายละเอียดเอกสาร</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                          <Form.Label>ชื่อเอกสาร</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>รายละเอียด</Form.Label> : {content}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ประเภท</Form.Label> : {category}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>หน่วยงาน</Form.Label> : {department}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>จัดทำโดย</Form.Label> : {author}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ไฟล์เอกสาร</Form.Label> :{" "}
                          <a
                            href={
                              "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/documents/" +
                              path
                            }
                            target="_blank"
                          >
                            ดาวน์โหลด
                          </a>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>วันที่จัดทำ</Form.Label> :{" "}
                          {dayjs(created).format("DD-MMMM-YYYY")}
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={ViewClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* View Blog Madal */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default blogs;
