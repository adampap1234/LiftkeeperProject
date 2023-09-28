import { useState } from 'react';
import {
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BottomAppBar = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionChange = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const questionsAndAnswers = [
    { question: "Hol tároljam az adatokat?", answer: "Mivel a feladat megkövetelte hogy az adatokat perzisztálni kell és React-es technológiát kell alkalmazni, így a redux mellett döntöttem." },
    { question: "Készítsek-e egy SPA-t, annak érdekében hogy a kliens oldali logika egyszerűbb, átláthatóbb legyen", answer: "Bár sok esetben egyszerűbb lett volna, kihívásként fogtam fel, hogy minden kalkuláció, data manaipulation a kliens oldalon marad." },
    { question: "Mi alapján számoltam ki a nyeremény visszaosztását?", answer: "Az összes játékos jegyvásárlásából származó bevételből visszatartok 10%-ot, a fenmaradó összeget osztom vissza találat arányosan (10,20,30,40%) kettes találat felett." }
  ];

  return (
    <>
      <div style={{ flexGrow: 1 }}></div>
      <AppBar position="fixed" color={'default'} style={{ top: 'auto', bottom: 0 }}>
        <Accordion expanded={isAccordionOpen} onChange={handleAccordionChange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Felmerült kérdések és válaszok:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {questionsAndAnswers.map((qa, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="h6" gutterBottom>
                    K: {qa.question}
                  </Typography>
                  <Typography>
                    V: {qa.answer}
                  </Typography>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </AppBar>
    </>
  );
};

export default BottomAppBar;
