import React, { useState } from 'react';
import axios from 'axios';

function LogForm({ onSaved }) {
  const [form, setForm] = useState({ date: '', sleep: '', wakeUpTime: '', workHours: '', phoneUsageMinutes: '', notes: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/logs', form);
      setForm({ date: '', sleep: '', wakeUpTime: '', workHours: '', phoneUsageMinutes: '', notes: '' });
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Add / Update Daily Log</h2>
      <form onSubmit={handleSubmit}>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="sleep" type="number" placeholder="Sleep hrs" value={form.sleep} onChange={handleChange} />
        <input name="wakeUpTime" type="text" placeholder="Wake-up time" value={form.wakeUpTime} onChange={handleChange} />
        <input name="workHours" type="number" placeholder="Work hrs" value={form.workHours} onChange={handleChange} />
        <input name="phoneUsageMinutes" type="number" placeholder="Phone min" value={form.phoneUsageMinutes} onChange={handleChange} />
        <input name="notes" type="text" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default LogForm;
