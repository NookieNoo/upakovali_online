<?php

namespace App\Services;

use Illuminate\Contracts\Filesystem\Filesystem;

class ImageUploader
{
    public function __construct(
        private Filesystem $storage,
    )
    {
    }

    public function save($path, $file)
    {
        $this->storage->put($path, $file);
    }
}
