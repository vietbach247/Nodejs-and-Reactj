import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert, Typography, Card, Row, Col, Rate } from "antd";
import "tailwindcss/tailwind.css";
import { Movie } from "../../interfaces/Movie";
import constants from "../../sever";

const { Title, Text } = Typography;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await constants.get(`/movie/${id}`);
        const movieData = response.data.data;
        if (movieData && typeof movieData === "object") {
          setMovie(movieData as Movie);
        } else {
          setError("API returned unexpected data format");
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [id]);

  if (loading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (error || !movie) {
    return (
      <Alert
        message="Error"
        description={error || "Movie not found"}
        type="error"
        showIcon
        className="m-4"
      />
    );
  }

  return (
    <div className="p-4">
      <div
        className="relative pb-9/16 mb-4"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${movie.youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <Card className="bg-gray-900 text-white">
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <img
              src={movie.poster_url}
              alt={movie.name}
              className="w-full h-auto rounded"
            />
          </Col>
          <Col span={20}>
            <Title level={3} className="text-white">
              {movie.name}
            </Title>
            <Text className="text-gray-400">
              {movie.origin_name} ({movie.year})
            </Text>
            <div className="flex items-center mt-2">
              <Text className="text-gray-400 mr-4">{movie.time}</Text>
              <Text className="text-gray-400">{movie.type}</Text>
            </div>

            <div className="flex items-center mt-2">
              <Text className="bg-gray-800 p-1 rounded text-gray-400 mr-2">
                Phim Chính Kịch
              </Text>
              <Text className="bg-gray-800 p-1 rounded text-gray-400">
                Phim Hành Động
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
      <div
        className="relative pb-9/16 mt-4"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${movie.trailerId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetail;
