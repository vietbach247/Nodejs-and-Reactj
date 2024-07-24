import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Typography,
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Select,
} from "antd";
import { Movie } from "../../interfaces/Movie";
import { Category } from "../../interfaces/Category";
import { Country } from "../../interfaces/Country";
import constants from "../../sever";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên phim không được để trống",
  }),
  slug: Joi.string().required().messages({
    "string.empty": "Slug không được để trống",
  }),
  origin_name: Joi.string().required().messages({
    "string.empty": "Tên gốc không được để trống",
  }),
  type: Joi.string().required().messages({
    "string.empty": "Thể loại không được để trống",
  }),
  poster_url: Joi.string().required().messages({
    "string.empty": "Đường dẫn ảnh bìa không được để trống",
  }),
  thumb_url: Joi.string().required().messages({
    "string.empty": "Đường dẫn ảnh nhỏ không được để trống",
  }),
  sub_docquyen: Joi.boolean(),
  chieurap: Joi.boolean(),
  time: Joi.string().required().messages({
    "string.empty": "Thời lượng không được để trống",
  }),
  episode_current: Joi.string().required().messages({
    "string.empty": "Số tập hiện tại không được để trống",
  }),
  quality: Joi.string().required().messages({
    "string.empty": "Chất lượng không được để trống",
  }),
  lang: Joi.string().required().messages({
    "string.empty": "Ngôn ngữ không được để trống",
  }),
  year: Joi.number().required().messages({
    "number.base": "Năm không hợp lệ",
    "any.required": "Năm không được để trống",
  }),
  youtubeId: Joi.string().required().messages({
    "string.empty": "YouTube ID không được để trống",
  }),
  trailerId: Joi.string().required().messages({
    "string.empty": "Trailer ID không được để trống",
  }),
  price: Joi.number().required().messages({
    "number.base": "Giá phải là một số",
    "any.required": "Giá không được để trống",
  }),
  category: Joi.array().items(Joi.string()).min(1).messages({
    "array.min": "Vui lòng chọn ít nhất một thể loại",
  }),
  country: Joi.array().items(Joi.string()).min(1).messages({
    "array.min": "Vui lòng chọn ít nhất một quốc gia",
  }),
});

const MovieForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Movie>({
    resolver: joiResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      origin_name: "",
      type: "",
      poster_url: "",
      thumb_url: "",
      sub_docquyen: false,
      chieurap: false,
      time: "",
      episode_current: "",
      quality: "",
      lang: "",
      year: 0,
      youtubeId: "",
      trailerId: "",
      price: 0,
      category: [],
      country: [],
    },
  });

  const [backendError, setBackendError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await constants.get("/category");
        setCategories(data.movie);
      } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const { data } = await constants.get("/country");
        setCountries(data.country);
      } catch (error) {
        console.log("Lỗi khi lấy quốc gia:", error);
      }
    };

    fetchCategories();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const { data } = await constants.get(`/movie/${id}`);
          reset(data.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchMovie();
    }
  }, [id, reset]);

  const handleMovieSubmit: SubmitHandler<Movie> = async (movieData) => {
    try {
      if (id) {
        await constants.put(`/movie/${id}`, movieData);
      } else {
        await constants.post("/movie", movieData);
      }
      navigate("/admin/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err: any) => {
          setError(err.param, { type: "server", message: err.msg });
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError("Có lỗi xảy ra, vui lòng thử lại");
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", background: "#f0f2f5" }}
        >
          <Col xs={22} sm={16} md={12} lg={8}>
            <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
              <Title level={2} className="text-center">
                {id ? "Chỉnh sửa Phim" : "Thêm Phim Mới"}
              </Title>
              <Form
                layout="vertical"
                onFinish={handleSubmit(handleMovieSubmit)}
              >
                <Form.Item
                  label="Tên Phim"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name?.message}
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Slug"
                  validateStatus={errors.slug ? "error" : ""}
                  help={errors.slug?.message}
                >
                  <Controller
                    name="slug"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên Gốc"
                  validateStatus={errors.origin_name ? "error" : ""}
                  help={errors.origin_name?.message}
                >
                  <Controller
                    name="origin_name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Thể loại"
                  validateStatus={errors.type ? "error" : ""}
                  help={errors.type?.message}
                >
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Đường dẫn ảnh bìa"
                  validateStatus={errors.poster_url ? "error" : ""}
                  help={errors.poster_url?.message}
                >
                  <Controller
                    name="poster_url"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Đường dẫn ảnh nhỏ"
                  validateStatus={errors.thumb_url ? "error" : ""}
                  help={errors.thumb_url?.message}
                >
                  <Controller
                    name="thumb_url"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item>
                  <Controller
                    name="sub_docquyen"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      >
                        Dịch vụ Độc Quyền
                      </Checkbox>
                    )}
                  />
                </Form.Item>
                <Form.Item>
                  <Controller
                    name="chieurap"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      >
                        Chiếu Rạp
                      </Checkbox>
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Thời lượng"
                  validateStatus={errors.time ? "error" : ""}
                  help={errors.time?.message}
                >
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Số tập hiện tại"
                  validateStatus={errors.episode_current ? "error" : ""}
                  help={errors.episode_current?.message}
                >
                  <Controller
                    name="episode_current"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Chất lượng"
                  validateStatus={errors.quality ? "error" : ""}
                  help={errors.quality?.message}
                >
                  <Controller
                    name="quality"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Ngôn ngữ"
                  validateStatus={errors.lang ? "error" : ""}
                  help={errors.lang?.message}
                >
                  <Controller
                    name="lang"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Năm"
                  validateStatus={errors.year ? "error" : ""}
                  help={errors.year?.message}
                >
                  <Controller
                    name="year"
                    control={control}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Giá"
                  validateStatus={errors.price ? "error" : ""}
                  help={errors.price?.message}
                >
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="YouTube ID"
                  validateStatus={errors.youtubeId ? "error" : ""}
                  help={errors.youtubeId?.message}
                >
                  <Controller
                    name="youtubeId"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Trailer ID"
                  validateStatus={errors.trailerId ? "error" : ""}
                  help={errors.trailerId?.message}
                >
                  <Controller
                    name="trailerId"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Thể loại"
                  validateStatus={errors.category ? "error" : ""}
                  help={errors.category?.message}
                >
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        placeholder="Chọn thể loại"
                        onChange={(value) => field.onChange(value)}
                        defaultValue={[]}
                      >
                        {categories.map((category) => (
                          <Option key={category._id} value={category._id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Quốc gia"
                  validateStatus={errors.country ? "error" : ""}
                  help={errors.country?.message}
                >
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        placeholder="Chọn quốc gia"
                        onChange={(value) => field.onChange(value)}
                        defaultValue={[]}
                      >
                        {countries.map((country) => (
                          <Option key={country._id} value={country._id}>
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
                {backendError && <Alert message={backendError} type="error" />}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {id ? "Cập nhật" : "Thêm mới"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MovieForm;
