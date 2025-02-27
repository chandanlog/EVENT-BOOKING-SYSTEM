"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const events = [
  {
    title: "React Conf 2025",
    date: "March 15, 2025",
    location: "San Francisco",
    image: "https://s3.amazonaws.com/angularminds.com/blog/media/React%20Summit-20240906120708414.png",
  },
  {
    title: "AI & ML Summit",
    date: "April 5, 2025",
    location: "New York",
    image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Summit%20Poster%20Image.png",
  },
  {
    title: "Music Fest 2025",
    date: "May 20, 2025",
    location: "Los Angeles",
    image: "https://theindianmusicdiaries.com/wp-content/smush-webp/2024/12/Supersonic.jpg.webp",
  },
  {
    title: "Blockchain Expo",
    date: "June 10, 2025",
    location: "London",
    image: "https://blockchain-expo.com/europe/wp-content/uploads/2023/10/MicrosoftTeams-image-41.png",
  },
  {
    title: "Startup Pitch Day",
    date: "July 1, 2025",
    location: "Bangalore",
    image: "https://startupnv.org/wp-content/uploads/2023/08/pitchday.png",
  },
  {
    title: "Cyber Security Conference",
    date: "August 22, 2025",
    location: "Dubai",
    image: "https://events.holyrood.com/wp-content/uploads/2021/10/CyberSecurityScotland_900x517_Header.jpg",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#1c1e21", color: "white", minHeight: "100vh", py: 5 }}>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#64ffda" }}>
          Find & Register for Top Events!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#b0bec5" }}>
          Explore conferences, concerts, and workshops worldwide.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 30,
            "& .MuiOutlinedInput-root": { borderRadius: 30, px: 2 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Container>

      {/* Events Section */}
      <Container>
        <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", mb: 4, color: "#64ffda" }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  bgcolor: "#2c2f33",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  height: "100%",
                  "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.title}
                  onError={(e) => (e.currentTarget.src = "/default-event.jpg")}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#64ffda" }}>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1, color: "#b0bec5" }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1, color: "#b0bec5" }}>
                    <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
