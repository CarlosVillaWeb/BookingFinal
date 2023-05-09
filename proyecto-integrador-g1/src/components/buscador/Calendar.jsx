import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "../module/Calendar.module.css";

const { RangePicker } = DatePicker;

export const Calendar = ({ manejadorDeEstadoCalendario }) => {
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("date");
  };
  const onChange = (date, dateString) => {
    manejadorDeEstadoCalendario(dateString);
  };

  return (
    <RangePicker
      onChange={onChange}
      format="YYYY-MM-DD"
      disabledDate={disabledDate}
      size="large"
      placement="bottomRight"
      placeholder={["Check in", "Check out"]}
      className={`${styles.calendarForm}`}
      // status="warning"
    />
  );
};
