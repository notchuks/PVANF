import { Facebook, Instagram, Pinterest, Twitter, Room, Phone, MailOutline } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';

import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ display: "none" })}
`;

const Title = styled.h3`
    margin-bottom: 20px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>PVANF.</Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sunt saepe placeat eaque. Odio, iste voluptas! Quam nulla cupiditate expedita beatae voluptatibus magnam, quas similique dolore provident dolor quaerat harum.</Desc>
            <SocialContainer>
                <SocialIcon color="3B9555">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="34405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men</ListItem>
                <ListItem>Women</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Orders</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact Us</Title>
            <ContactItem>
                <Room style={{ marginRight: "10px" }} /> 3, AIT Street, JS, Arepo
            </ContactItem>
            <ContactItem>
                <Phone style={{ marginRight: "10px" }} /> +2348162343808
            </ContactItem>
            <ContactItem>
                <MailOutline style={{ marginRight: "10px" }} /> contact@pvanf.co.uk
            </ContactItem>
            <Payment src="https://i.ibb.co./Qfvn4z6/payment.png" />
        </Right>
    </Container>
  )
}

export default Footer;