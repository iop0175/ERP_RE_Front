import Loading from "@/styles/SVG/Loading";
import "@/styles/css/ui/PageLoading.css"
const PageLoading = () => {
    return (
            <div className="pageLoading">
                <Loading/>
                Please wait loading page data…
            </div>
    )
}
export default PageLoading;