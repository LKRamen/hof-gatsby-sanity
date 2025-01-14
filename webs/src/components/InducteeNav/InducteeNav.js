import React, {useState} from "react"
import { graphql } from 'gatsby'
import { GatsbyImage} from 'gatsby-plugin-image'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import InducteeCard from "../InducteeCard/InducteeCard";
import Title from "../Title/Title";
import * as styles from './inducteenav.module.scss';

const InducteeNav = ( props ) => {
  const data = props.data

  // Function to handle year selection - pass in state values as props because each instance of the component needs to handle its own state
  const handleYearClick = (year) => {
    props.setSelectedYear(year);
  };
  
  // Filter inductees based on the selected year
  const filteredInductees = props.selectedYear ? data.filter(node => node.inductee.year === props.selectedYear) : data;

  return (
    <Container className='d-flex flex-column'>
      <div className='d-flex align-items-center pb-5' style={{borderBottom: '1px solid #bbb'}}>
          <Title className="mx-3" style={{borderBottom: 'none'}}>{props.title}</Title>
          <Nav as="ul" className={styles.navFilter}>
            <Nav.Item as="li" onClick={() => handleYearClick(null)} tabIndex='-1'>All</Nav.Item>
            <Nav.Item as="li" onClick={() => handleYearClick("2023")} tabIndex='-1'>2023</Nav.Item>
            <Nav.Item as="li" onClick={() => handleYearClick("2022")} tabIndex='-1'>2022</Nav.Item>
            
            {/* Add more years here */}
          </Nav>
      </div>
      <div className='py-3'>
        <ul className={styles.inducteesList}>
          {filteredInductees.map((node, index) => (
            <li key={index}>
              <InducteeCard img={node.inductee.profilePhoto.asset.gatsbyImageData} name={node.inductee.name} company={node.inductee.company} link={props.title === "Inductees" ? node.slug.current : node.linkedin}/>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}



export default InducteeNav;

export const Head = () => <title>Home Page</title>
