<div class="input-group">
    <div class="input-container">
        <select name="{{ $name }}" id="{{ $name }}">
            <?php $selectedKey = isset($settings[$name]) ? (isset($isOption) && $isOption ? $settings[$name] : $settings[$name][0]) : false; ?>
            @foreach($options as $key => $optionName)
                <option value="{{ $key }}" @if($selectedKey && $key == $selectedKey) selected="selected" @endif>{{ $optionName }}</option>
            @endforeach
        </select>
    </div>
</div>