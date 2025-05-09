# Supabase Integration Instructions

## Profiles Table
- The `profiles` table stores additional user information linked to Supabase Auth users.
- It includes username, full name, and profile image URL.

## Professionals Table
- The `professionals` table stores professional-specific information linked to profiles.
- It includes profession, contact info, bio, and timestamps.
- Users can view professionals publicly, but only owners can modify their own professional records.

## Supabase Storage for Profile Images
- Supabase provides Storage buckets to store files such as profile images.
- Create a storage bucket (e.g., "profile-images") in the Supabase dashboard.
- Upload profile images to this bucket.
- Store the public URL or path of the uploaded image in the `profile_image_url` field in the `profiles` table.

## Registration and Login Integration
- Use Supabase Auth client (already set up in `lib/supabaseClient.ts`) for user registration and login.
- Example for registration:
  ```ts
  const { user, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'password123',
  });
  ```
- Example for login:
  ```ts
  const { user, error } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password123',
  });
  ```

## Profile Management
- After user registration, create a profile row in the `profiles` table with the user's `id` (UUID).
- Allow users to update their profile information and upload profile images.
- Use Supabase Storage API to upload images and update the `profile_image_url` in the `profiles` table.

## Professionals Management
- Professionals can create and update their professional profile in the `professionals` table.
- Users can view the list of professionals publicly.
- Professional owners can update or delete their own professional records.

## Frontend Suggestions
- Create registration and login pages/components using Supabase Auth client.
- Create a profile edit page/component to update username, full name, and upload profile image.
- Create professional profile pages/components to manage professional details.
- Use Supabase Storage client to handle image uploads.

## Testing
- Run the SQL script `init_auth_and_professionals.sql` in the Supabase SQL editor to create tables and insert example users.
- Test registration, login, profile image upload, and professional profile management flows using the preloaded example users.

For more details, refer to the Supabase documentation: https://supabase.com/docs
