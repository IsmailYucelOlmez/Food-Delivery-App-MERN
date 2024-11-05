import { useGetMyUser, useUpdateMyUser } from '@/api/UserApi'
import UserProfileForm from '@/components/forms/user/UserProfileForm'

const UserProfilePage = () => {

    const {updateUser,isLoading:isUpdateLoading}=useUpdateMyUser();
    const {currentUser, isLoading:isGetLoading}=useGetMyUser();

  if(isGetLoading){

    return(
      <span>Loading...</span>
    )
  }

  if(!currentUser){

    return(
      <span>Couldn't Load User Information</span>
    )
  }

  return (   
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>  
  )
}

export default UserProfilePage
