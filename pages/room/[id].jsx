import { useRouter } from 'next/router';

function Room() {
  const router = useRouter();
  const { id } = router.query;

  return <h1> Room id: {id} </h1>
}

export default Room;