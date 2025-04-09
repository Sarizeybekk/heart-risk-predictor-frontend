import React, { useState } from "react";
import "./PredictionForm.css";

function PredictionForm() {
  const [formData, setFormData] = useState({
    Age: "",
    Sex: "",
    ChestPainType: "",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: "",
    RestingECG: "",
    MaxHR: "",
    ExerciseAngina: "",
    Oldpeak: "",
    ST_Slope: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      Age: parseInt(formData.Age),
      Sex: parseInt(formData.Sex),
      ChestPainType: parseInt(formData.ChestPainType),
      RestingBP: parseInt(formData.RestingBP),
      Cholesterol: parseInt(formData.Cholesterol),
      FastingBS: parseInt(formData.FastingBS),
      RestingECG: parseInt(formData.RestingECG),
      MaxHR: parseInt(formData.MaxHR),
      ExerciseAngina: parseInt(formData.ExerciseAngina),
      Oldpeak: parseFloat(formData.Oldpeak),
      ST_Slope: parseInt(formData.ST_Slope),
    };

    try {
      const response = await fetch("http://localhost:8002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Sunucu cevabı başarısız.");
      }

      setResult(
        data.prediction === 1
          ? "❗ Kalp hastalığı riski VAR"
          : "✅ Kalp hastalığı riski YOK"
      );
    } catch (error) {
      console.error("Tahmin hatası:", error);
      setResult("⚠ Tahmin alınamadı. Detay: " + error.message);
    }
  };

  const handleReset = () => {
    setFormData({
      Age: "",
      Sex: "",
      ChestPainType: "",
      RestingBP: "",
      Cholesterol: "",
      FastingBS: "",
      RestingECG: "",
      MaxHR: "",
      ExerciseAngina: "",
      Oldpeak: "",
      ST_Slope: "",
    });
    setResult(null);
  };

  return (
    <div className="container">
      <h2 className="title">❤️ Kalp Hastalığı Risk Tahmini</h2>
      <p className="description">
        Bu form, çeşitli sağlık parametrelerine dayalı olarak kalp hastalığı riski tahmini yapar. Lütfen tüm alanları doğru bilgilerle doldurunuz.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>Yaş
            <input type="number" name="Age" placeholder="30-90" value={formData.Age} onChange={handleChange} required />
          </label>

          <label>Cinsiyet
            <select name="Sex" value={formData.Sex} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="1">Erkek</option>
              <option value="0">Kadın</option>
            </select>
          </label>

          <label>Göğüs Ağrısı Tipi
            <select name="ChestPainType" value={formData.ChestPainType} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="0">Tip 0</option>
              <option value="1">Tip 1</option>
              <option value="2">Tip 2</option>
              <option value="3">Tip 3</option>
            </select>
          </label>

          <label>İstirahat Kan Basıncı
            <input type="number" name="RestingBP" placeholder="90-200 mm Hg" value={formData.RestingBP} onChange={handleChange} required />
          </label>

          <label>Kolesterol
            <input type="number" name="Cholesterol" placeholder="100-600 mg/dl" value={formData.Cholesterol} onChange={handleChange} required />
          </label>

          <label>Açlık Kan Şekeri
            <select name="FastingBS" value={formData.FastingBS} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="0">0 (≤120 mg/dl)</option>
              <option value="1">1 (>120 mg/dl)</option>
            </select>
          </label>

          <label>İstirahat EKG
            <select name="RestingECG" value={formData.RestingECG} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="0">Normal</option>
              <option value="1">Anormallik</option>
              <option value="2">Muhtemel hipertrofi</option>
            </select>
          </label>

          <label>Maksimum Kalp Hızı
            <input type="number" name="MaxHR" placeholder="60-220 bpm" value={formData.MaxHR} onChange={handleChange} required />
          </label>

          <label>Egzersiz Anjinası
            <select name="ExerciseAngina" value={formData.ExerciseAngina} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="0">Yok</option>
              <option value="1">Var</option>
            </select>
          </label>

          <label>ST Depresyonu
            <input type="number" name="Oldpeak" placeholder="0.0-10.0" step="0.1" value={formData.Oldpeak} onChange={handleChange} required />
          </label>

          <label>ST Eğimi
            <select name="ST_Slope" value={formData.ST_Slope} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="0">Downsloping</option>
              <option value="1">Flat</option>
              <option value="2">Upsloping</option>
            </select>
          </label>
        </div>

        <div className="button-group">
          <button type="submit">Tahmin Et</button>
          <button type="button" onClick={handleReset}>Sıfırla</button>
        </div>
      </form>

      <div className="result-section">
        <h3>🔎 Sonuç</h3>
        {result ? (
          <p className="prediction-result">{result}</p>
        ) : (
          <p className="prediction-placeholder">Kalp hastalığı risk tahminini görmek için formu doldurup "Tahmin Et" düğmesine basınız.</p>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;