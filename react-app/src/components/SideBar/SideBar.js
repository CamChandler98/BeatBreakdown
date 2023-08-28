import PlaylistThumb from "./PlaylistThumb"

import './SideBar.css'

const SideBar = ({playlists}) => {

    //console.log(playlists)
    return (
        <div className="side-bar">
            {/* <div className="side-bar-header">
            <h1 > Playlists </h1>

            </div> */}
            <div className="playlist-container">
                {playlists.length > 1 && playlists.map(playlist => {

                    return (
                        <PlaylistThumb key = {playlist.id} playlist={playlist} />
                    )
                })}
            </div>
        </div>
    )
}

export default SideBar