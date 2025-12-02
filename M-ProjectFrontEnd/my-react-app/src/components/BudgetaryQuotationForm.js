import React, { useState } from "react";
import axios from "axios";
import "./TenderForm.css";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Divider,
  Alert,
  Snackbar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";

const defenceOptions = ["Defence", "Non-Defence"];
const statusOptions = [
  "BQ Submitted",
  "Commercial Bid Submitted",
  "EOI was submitted",
  "Not participated",
  " ",
];
const leadOwnerOption = [
  "Umesha A", "Solomon", "Jamuna", "Asharani", "Chinta",
  "Sravanthy", "Praveen", "Sandeep", "Puneet", "Raju", "Sivaprasath"
];

export default function BudgetaryQuotationForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [competitorsList, setCompetitorsList] = useState([""]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { leadOwner: [] },
  });

  const addCompetitorField = () => setCompetitorsList([...competitorsList, ""]);
  const removeCompetitorField = (index) =>
    setCompetitorsList(competitorsList.filter((_, i) => i !== index));

  const updateCompetitorValue = (value, index) => {
    const updated = [...competitorsList];
    updated[index] = value;
    setCompetitorsList(updated);
  };

  const onSubmit = async (data) => {
    const cleanedCompetitors = competitorsList
      .map((v) => v.trim())
      .filter((v) => v !== "");

    // 🚨 IMPORTANT: These keys now match Sequelize model
    const formatted = {
      bqTitle: data.bqTitle,
      customer: data.customer,
      leadOwner: data.leadOwner,
      defenceType: data.defenceType,
      estimatedValue: data.estimatedValue,
      submittedValue: data.submittedValue,
      dateOfSubmission: data.dateOfSubmission,
      referenceNo: data.referenceNo,
      competitors: cleanedCompetitors,
      presentStatus: data.presentStatus,
      submittedAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/api/bq", formatted, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmittedData(formatted);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      alert("❌ Error submitting form — check backend logs");
    }
  };

  const handleReset = () => {
    reset();
    setCompetitorsList([""]);
    setSubmittedData(null);
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Budgetary Quotation Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill details below to submit the form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Section 1 */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📋 Quotation Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[["bqTitle", "BQ Title"], ["customer", "Customer"]].map(([name, label]) => (
                  <Grid item xs={12} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={label}
                          fullWidth
                          multiline
                          rows={2}
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Controller
                    name="leadOwner"
                    control={control}
                    rules={{ required: "Lead Owner is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        options={leadOwnerOption}
                        value={field.value || []}
                        onChange={(e, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Lead Owner (Multi-select)"
                            fullWidth
                            error={!!errors.leadOwner}
                            helperText={errors.leadOwner?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">💰 Financial & Classification</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="defenceType"
                    control={control}
                    rules={{ required: "Defence / Non-Defence Type is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Defence / Non-Defence"
                        fullWidth
                        error={!!errors.defenceType}
                        helperText={errors.defenceType?.message}
                      >
                        {defenceOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {[["estimatedValue", "Estimated Value (in Crore without GST)", "number"],
                  ["submittedValue", "Submitted Value (in Crore without GST)", "number"]]
                  .map(([name, label, type]) => (
                    <Grid item xs={12} md={6} key={name}>
                      <Controller
                        name={name}
                        control={control}
                        rules={{ required: `${label} is required` }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type={type}
                            label={label}
                            fullWidth
                            multiline
                            rows={2}
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📅 Submission & Status</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="dateOfSubmission"
                    control={control}
                    rules={{ required: "Date of Letter Submission is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Date of Letter Submission"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dateOfSubmission}
                        helperText={errors.dateOfSubmission?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="referenceNo"
                    control={control}
                    rules={{ required: "Reference No is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Reference Number"
                        fullWidth
                        multiline
                        rows={2}
                        error={!!errors.referenceNo}
                        helperText={errors.referenceNo?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Competitors */}
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Competitors</Typography>
                  {competitorsList.map((value, index) => (
                    <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                      <Grid item xs={11}>
                        <TextField
                          fullWidth
                          label={`Competitor ${index + 1}`}
                          value={value}
                          onChange={(e) => updateCompetitorValue(e.target.value, index)}
                        />
                      </Grid>
                      <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="error" onClick={() => removeCompetitorField(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={addCompetitorField}>
                    + Add Competitor
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="presentStatus"
                    control={control}
                    rules={{ required: "Present Status is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Present Status"
                        fullWidth
                        error={!!errors.presentStatus}
                        helperText={errors.presentStatus?.message}
                      >
                        {statusOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button type="submit" variant="contained" size="large" className="btn-submit">
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="button" variant="outlined" size="large" className="btn-reset" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </form>

        {/* Snackbar */}
        <Snackbar open={submitSuccess} autoHideDuration={5000} onClose={() => setSubmitSuccess(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Budgetary Quotation submitted successfully!
          </Alert>
        </Snackbar>

        {/* JSON OUTPUT */}
        {submittedData && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6">📊 Submitted Data (JSON)</Typography>
            <Divider sx={{ mb: 2 }} />
            <Paper
              elevation={2}
              sx={{
                p: 3,
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                maxHeight: 480,
                overflow: "auto",
                borderRadius: 2,
              }}
            >
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
