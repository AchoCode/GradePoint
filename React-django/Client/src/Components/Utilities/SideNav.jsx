import React from "react";
import { Button } from "../Utilities/Button";
export const SideNav = () => {
  return (
    <div className="side-nav">
      <Button title='Nursery' link='/nursery-grade' />
      <Button title='Primary' link='/primary-grade' />
      <Button title='Secondary' link='/secondary-grade' />
      <Button title='Manage students' link='/manage-students' />
      <Button title='Scratch cards' link='/scratch-card' />
      <Button title='Logout' />
    </div>
  );
};
