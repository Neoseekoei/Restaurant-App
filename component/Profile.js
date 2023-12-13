import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState([]);
  const initialUser = {
    name: "Kenth",
    phone: "0674321256",
    email: "Example@gmail.com",
    address: "12th st",
    photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
      // Add more photo URLs as needed
    ],
  };
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const authUser = getAuth().currentUser;
      const documentId = profileInfo.length > 0 ? profileInfo[0].id : ""; // Check if profileInfo is available

      console.log("Updating document with ID:", documentId);

      // Update the Firestore document with the new user information
      await updateDoc(doc(db, "users" + authUser.email, documentId), {
        Name: user.name,
        Email: user.email,
        Number: user.phone,
        Address: user.address,
      });

      // Update the local state with the new user information
      setProfileInfo([
        {
          ...profileInfo[0],
          Name: user.name,
          Email: user.email,
          Number: user.phone,
          Address: user.address,
        },
      ]);
      setIsEditing(false);
    } catch (error) {
      alert("Error updating profile: " + error.message);
      console.error("Error updating profile: ", error);
    }
  };

  // ... (remaining code)

  const handleCancelClick = () => {
    setUser(initialUser);
    setIsEditing(false);
  };

  const authUser = getAuth().currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = getAuth().currentUser;
        const querySnapshot = await getDocs(
          collection(db, "users" + authUser.uid)
        );
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProfileInfo(newData);
        console.log(newData);
      } catch (error) {
        alert("error");
        console.error("Error fetching menu: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleProfileInfo = async () => {
      try {
        const authUser = getAuth().currentUser;
        if (authUser) {
          const querySnapshot = await getDocs(
            collection(db, "users" + authUser.email)
          );
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(newData);
          setProfileInfo(newData);
        }
      } catch (error) {
        alert("error");
        console.error("Error fetching profileInfo: ", error);
      }
    };

    handleProfileInfo();
  }, []);

  const [cartInfo, setCartInfo] = useState([]);

  const handleCartinfo = async () => {
    try {
      const authUser = getAuth().currentUser;
      if (authUser) {
        const querySnapshot = await getDocs(
          collection(db, "Cart" + authUser.email)
        );
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCartInfo(newData);
      }
    } catch (error) {
      alert("error");
      console.error("Error fetching profileInfo: ", error);
    }
  };
  useEffect(() => {
    handleCartinfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#FFC224" }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>User Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://example.com/profile.jpg" }}
            style={styles.profileImage}
          />
          {isEditing ? (
            <View style={styles.editModeContainer}>
              <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
              <TextInput
                style={styles.input}
                value={user.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
              />
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(value) => handleInputChange("email", value)}
              />
              <TextInput
                style={styles.input}
                value={user.address}
                onChangeText={(value) => handleInputChange("address", value)}
              />
              <Button title="Save" onPress={handleSaveClick} />
              <Button title="Cancel" onPress={handleCancelClick} />
            </View>
          ) : (
            <View>
              <Text style={styles.label}>
                Name: {profileInfo.length > 0 ? profileInfo[0].Name : ""}
              </Text>
              <Text style={styles.label}>
                Phone No.: {profileInfo.length > 0 ? profileInfo[0].Number : ""}
              </Text>
              <Text style={styles.label}>
                Email: {profileInfo.length > 0 ? profileInfo[0].Email : ""}
              </Text>
              <Text style={styles.label}>
                Address: {profileInfo.length > 0 ? profileInfo[0].Address : ""}
              </Text>
              <TouchableOpacity
                onPress={handleEditClick}
                style={{
                  borderWidth: 1,
                  width: 120,
                  textAlign: "center",
                  padding: 10,
                  marginLeft: 50,
                  marginTop: 20,
                  backgroundColor: "white",
                  borderColor: "white",
                  borderRadius: 15,
                  height: 47,
                  paddingTop: 15,
                  fontWeight: 800,
                  fontFamily: "Sans-serif",
                  shadowOffset: { width: 8, height: 8 },
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  paddingLeft: 30,
                }}
              >
                <Text>EDIT</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Photos Grid */}
          {profileInfo.length > 0 && (
            <FlatList
              data={profileInfo[0].photos}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.photoThumbnail} />
              )}
            />
          )}
        </View>
      </View>

      <View style={{ marginTop: 70 }}>
        {cartInfo.map((info) => (
          <View
            key={info.id}
            style={{
              backgroundColor: "#FFC224",
              height: 300,
              width: 300,
              marginBottom: 30,
              borderRadius: 20,
              // marginLeft:25
            }}
          >
            <Image style={styles.card1} source={info.image} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "black",
                width: 250,
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              Name: {info.Name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "black",
                width: 250,
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              Price:R {info.Price}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "black",
                width: 250,
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              Quantity: {info.Quantity}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "black",
                width: 250,
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              Description: {info.Description}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "black",
                width: 250,
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              Option: {info.Options}
            </Text>
            <Image style={styles.card1} source={info.image} />
            {/* Display other fields as needed */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    // backgroundColor: "#FFC224",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editModeContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    borderColor:"white"
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },

  card1: {
    height: 50,
    width: 50,
  },
});

export default Profile;
