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

export interface ITranslatorPageProps {}

const TranslatorPage: React.FunctionComponent<ITranslatorPageProps> = (
  props
) => {
  const [transText, setTransText] = useState('Waiting for input...');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const moods = moodOptions;
  const genres = genreOptions;
  const [translateTo, setTranslateTo] = useState('');
  const instruct = '';

  const handleMoodChange = (event: SelectChangeEvent<typeof mood>) => {
    setMood(event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent<typeof genre>) => {
    setGenre(event.target.value);
  };

  const handleTranslateToChange = (
    event: SelectChangeEvent<typeof translateTo>
  ) => {
    setTranslateTo(event.target.value);
  };

  const navigate = useNavigate();

  const transClick = async () => {
    const myTextField: HTMLInputElement = document.getElementById(
      'original-text'
    ) as HTMLInputElement;
    const originalText: string = myTextField.value;
    const accessToken = localStorage.getItem('access_token');
    interface TranslatorRequest {
      text: string;
      mood: string;
      genre: string;
      lang: string;
      instruct: string;
    }
    const url = back_url + 'api/translator';
    const request: TranslatorRequest = {
      text: originalText,
      mood: mood,
      genre: genre,
      lang: translateTo,
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
      setTransText(result.answer);
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
        Translation options:
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Translate to</InputLabel>
        <Select
          value={translateTo}
          onChange={handleTranslateToChange}
          label="Translate to">
          <MenuItem value="">Autotest</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zhs">Chinese</MenuItem>
        </Select>
      </FormControl>
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
        Input the text to translate:
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
      <Button variant="contained" onClick={transClick} sx={{ mb: 2 }}>
        Translate
      </Button>
      <br />
      <Typography variant="body1" align="center">
        <Box sx={{ whiteSpace: 'pre-line' }}>{transText}</Box>
      </Typography>
    </Container>
  );
};

export default TranslatorPage;
