import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: calc(100vh - 90px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f1f3f5;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

const CurrentPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: linear-gradient(45deg, #4ecdc4, #45b7d1);
  color: white;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const PhotoInfo = styled.div`
  flex: 1;
`;

const PhotoTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const PhotoDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #4ecdc4, #45b7d1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
  }

  &.error {
    border-color: #ff6b6b;
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #4ecdc4, #45b7d1);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const PasswordSection = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
`;

const ProfilePage = () => {
  const { user, updateProfile, updatePassword, uploadProfilePhoto, isLoading } =
    useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Photo size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio should be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: result.error,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Failed to update profile. Please try again.",
      }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    try {
      const result = await updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
      );

      if (result.success) {
        setPasswordSuccess("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setPasswordSuccess(""), 3000);
      } else {
        setErrors((prev) => ({
          ...prev,
          password: result.error,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: "Failed to update password. Please try again.",
      }));
    }
  };

  const handlePhotoUpload = async () => {
    if (photoPreview && photoPreview !== user?.profilePhoto) {
      try {
        const result = await uploadProfilePhoto(photoPreview);

        if (result.success) {
          setSuccessMessage("Profile photo updated successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          setErrors((prev) => ({
            ...prev,
            photo: result.error,
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          photo: "Failed to upload photo. Please try again.",
        }));
      }
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Title>My Profile</Title>
          <Subtitle>Manage your personal information and preferences</Subtitle>
        </Header>

        {successMessage && (
          <div
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "2rem",
              textAlign: "center",
              border: "1px solid #c3e6cb",
            }}
          >
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "2rem",
              textAlign: "center",
              border: "1px solid #f5c6cb",
            }}
          >
            {errors.general}
          </div>
        )}

        <Section>
          <SectionTitle>📸 Profile Photo</SectionTitle>
          <PhotoSection>
            <CurrentPhoto>
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" />
              ) : (
                user?.avatar || "👤"
              )}
            </CurrentPhoto>
            <PhotoInfo>
              <PhotoTitle>Update Your Photo</PhotoTitle>
              <PhotoDescription>
                Upload a new profile photo. Recommended size is 400x400 pixels.
              </PhotoDescription>
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <UploadButton onClick={() => fileInputRef.current?.click()}>
                📷 Choose Photo
              </UploadButton>
              {photoPreview !== user?.profilePhoto && (
                <UploadButton
                  onClick={handlePhotoUpload}
                  style={{ marginLeft: "1rem" }}
                >
                  💾 Save Photo
                </UploadButton>
              )}
              {errors.photo && <ErrorMessage>{errors.photo}</ErrorMessage>}
            </PhotoInfo>
          </PhotoSection>
        </Section>

        <Section>
          <SectionTitle>👤 Personal Information</SectionTitle>
          <Form onSubmit={handleProfileSubmit}>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "error" : ""}
                  disabled={isLoading}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                  disabled={isLoading}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number (optional)"
                className={errors.phone ? "error" : ""}
                disabled={isLoading}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <FormTextarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself (optional)"
                className={errors.bio ? "error" : ""}
                disabled={isLoading}
              />
              {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
            </FormGroup>

            <ButtonGroup>
              <Link to="/products">
                <CancelButton type="button">Cancel</CancelButton>
              </Link>
              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </Section>

        <PasswordSection>
          <SectionTitle>🔐 Change Password</SectionTitle>

          {passwordSuccess && (
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "center",
                border: "1px solid #c3e6cb",
              }}
            >
              {passwordSuccess}
            </div>
          )}

          {errors.password && (
            <div
              style={{
                background: "#f8d7da",
                color: "#721c24",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "center",
                border: "1px solid #f5c6cb",
              }}
            >
              {errors.password}
            </div>
          )}

          <Form onSubmit={handlePasswordSubmit}>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="currentPassword">
                  Current Password
                </FormLabel>
                <FormInput
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className={errors.currentPassword ? "error" : ""}
                  disabled={isLoading}
                />
                {errors.currentPassword && (
                  <ErrorMessage>{errors.currentPassword}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <FormInput
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className={errors.newPassword ? "error" : ""}
                  disabled={isLoading}
                />
                {errors.newPassword && (
                  <ErrorMessage>{errors.newPassword}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel htmlFor="confirmPassword">
                Confirm New Password
              </FormLabel>
              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? "error" : ""}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
              )}
            </FormGroup>

            <ButtonGroup>
              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </PasswordSection>
      </Card>
    </Container>
  );
};

export default ProfilePage;
