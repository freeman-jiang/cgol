import { Grid } from "@/components/Grid";
import { createGrid } from "@/logic/cgol";

const initialGrid = createGrid();

export default function Home() {
  return <Grid initialGrid={initialGrid} />;
}
