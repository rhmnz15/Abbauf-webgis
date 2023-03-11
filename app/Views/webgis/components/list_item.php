<div class="item-wrapper" role="layer-switcher">
    <div class="brightness-wrapper">
        <span class="back-icon"></span>
        <div class="brightness-box">
            <input type="range" id="range" name="brightness-<?= $id ?>" min="0" max="100" value="<?= $brightness ?: 0 ?>">
            <span><?= $brightness ?: 0 ?></span>
        </div>
    </div>
    <div class="over-zone"></div>
    <span class="brightness-icon" style="filter: invert(<?= $brightness ?: 0 ?>%)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16 5a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm14 10h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM16 27a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zM4 15H2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm2.808-6.778a1 1 0 0 0 1.414-1.414L6.808 5.394a1 1 0 0 0-1.414 1.414zm18.384-2.828-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 1 0-1.414-1.414zm0 18.384a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414zm-18.384 0-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414zM16 7a8.981 8.981 0 0 0-7.061 3.437A8.175 8.175 0 0 0 7 16a8.175 8.175 0 0 0 1.939 5.563A9 9 0 1 0 16 7zm-4 14a2.207 2.207 0 0 1-1.578-.789 6.956 6.956 0 0 1-1.371-3.4 6.442 6.442 0 0 1 0-1.618 6.956 6.956 0 0 1 1.371-3.4A2.206 2.206 0 0 1 12 11c1.626 0 3 2.29 3 5s-1.374 5-3 5zm4 2a6.943 6.943 0 0 1-2.315-.4C15.634 21.649 17 19.092 17 16s-1.366-5.649-3.315-6.6A7 7 0 1 1 16 23z" />
        </svg>
    </span>
    <label for="<?= $id ?>" class="layer-item-label">
        <li class="layer-item-list">
            <div class="layer-name">
                <span><?= $name ?></span>
            </div>
            <div class="toggle-btn" id="_3rd-toggle-btn">
                <input type="checkbox" class='layer-check' id="<?= $id ?>" name="<?= $id ?>" <?= $checked ? "checked" : "" ?>>
                <span></span>
            </div>
        </li>
    </label>
</div>