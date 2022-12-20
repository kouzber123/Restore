import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
    .then(() => console.log("should not see this"))
    .catch(error => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
        <ButtonGroup fullWidth>
          <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(err => console.log(err))}>
            Test 400 Error
          </Button>
          <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>
            Test 401 Error
          </Button>
          <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>
            Test 404 Error
          </Button>
          <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>
            Test 500 Error
          </Button>
          <Button variant="contained" onClick={getValidationError}>
            Test Validation Error
          </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && 
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(err => (
              <ListItem key={err}>
                <ListItemText>{err}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
        }
      </Typography>
    </Container>
  );
}
