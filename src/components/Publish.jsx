import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../css/Publish.module.css";
import { firestore } from "../lib/firebase"; // Firestore instance
import { storage } from "../lib/firebase"; // Storage instance

const Publish = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file upload selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!headline || !description || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);

      // Retrieve the image URL
      const imageUrl = await getDownloadURL(storageRef);

      // Save data to Firestore
      await addDoc(collection(firestore, "posts"), {
        headline,
        description,
        imageUrl,
        createdAt: new Date(),
      });

      // Send Firebase Notification using FCM API
      // const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "key=<YOUR_SERVER_KEY>", // Replace with your FCM Server Key
      //   },
      //   body: JSON.stringify({
      //     to: "/topics/posts", // Replace with your topic or device token
      //     notification: {
      //       title: "New Post Published!",
      //       body: `${headline}`,
      //       click_action: "https://yourapp.com/posts", // Replace with your app URL
      //     },
      //     data: {
      //       headline,
      //       description,
      //       imageUrl,
      //     },
      //   }),
      // });

      // if (response.ok) {
      //   console.log("Notification sent successfully!");
      // } else {
      //   console.error("Failed to send notification");
      // }

      alert("Post published successfully!");

      // Reset form
      setHeadline("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.Publish}>
      <div className={styles.Headline}>
        <span>Headline:</span>
        <input
          type="text"
          maxLength={40}
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>

      <div className={styles.Description}>
        <span>Description:</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.File}>
        <span>Upload image:</span>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default Publish;
