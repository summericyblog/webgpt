import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

import { back_url } from '../common/backend';
import { moodOptions, genreOptions } from '../common/parameters';
import ResponsiveAppBar from '../components/navbar';
import { useNavigate } from 'react-router';

export interface IPolishPageProps {}

const PolishPage: React.FunctionComponent<IPolishPageProps> = (props) => {
  const [polishText, setPolishText] = useState('Waiting for input...');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const moods = moodOptions;
  const genres = genreOptions;
  const instruct = '';

  const handleMoodChange = (event: SelectChangeEvent<typeof mood>) => {
    setMood(event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent<typeof genre>) => {
    setGenre(event.target.value);
  };

  const navigate = useNavigate();

  const polishClick = async () => {
    const myTextField: HTMLInputElement = document.getElementById(
      'original-text'
    ) as HTMLInputElement;
    const originalText: string = myTextField.value;
    const accessToken = localStorage.getItem('access_token');
    interface PolishRequest {
      text: string;
      mood: string;
      genre: string;
      instruct: string;
    }
    const url = back_url + 'api/polish';
    const request: PolishRequest = {
      text: originalText,
      mood: mood,
      genre: genre,
      instruct: instruct,
    };
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(url, request, config);
      const result = response.data;
      setPolishText(result.answer);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      }
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <ResponsiveAppBar />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Polish options:
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Mood selection</InputLabel>
        <Select value={mood} onChange={handleMoodChange} label="Mood selection">
          {moods.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Genre selection</InputLabel>
        <Select
          value={genre}
          onChange={handleGenreChange}
          label="Genre selection">
          {genres.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Input the text to polish:
      </Typography>
      <div>
        <TextField
          id="original-text"
          label="Original Text"
          multiline
          fullWidth
          rows={15}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </div>
      <Button variant="contained" onClick={polishClick} sx={{ mb: 2 }}>
        Polish
      </Button>
      <br />
      <Typography variant="body1" align="center">
        <Box sx={{ whiteSpace: 'pre-line' }}>{polishText}</Box>
      </Typography>
    </Container>
  );
};

export default PolishPage;
